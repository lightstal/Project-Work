import json
import re
import requests
import matplotlib.pyplot as plt
import io
import base64

def formatDateTime(dateTime):
    a = re.sub(r'[A-Z]', ' ', dateTime).rstrip().split()
    b = a[0].split('-')
    b[0], b[1] = b[2], b[1]
    b = '-'.join(b[:2])
    # print(b)
    return f"{b} {a[1]}"



def ReadAPI():
    response = requests.get("https://api.thingspeak.com/channels/1585193/feeds.json?results=2000000")
    a = {}
    data = response.json()
    for i in data['feeds']:
        print(i['field1'], i['created_at'])
        time = formatDateTime(i['created_at'])
        print(time)
        a.update({time: i['field1']})
    return a


def main():
    a = ReadAPI()
    print(a)
    plt.xlabel('Time')
    plt.ylabel('Temp (deg C)')
    plt.xticks(rotation=90)
    plt.subplots_adjust(bottom=0.30)
    plt.plot(list(a.keys()), list(a.values()))
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.show()


main()
