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
    return f"{b} {a[1]}"


def ReadAPI():
    # API URL
    response = requests.get("https://api.thingspeak.com/channels/1585193/feeds.json?results=2000000")
    temp = []
    time_arr = []
    data = response.json()
    for i in data['feeds']:
        print(i['field1'], i['created_at'])
        time = formatDateTime(i['created_at'])
        print(time)
        temp.append(i['field1'])
        time_arr.append(time)
    return temp, time_arr


def plotting():
    temp, time_arr = ReadAPI()
    # Only select last 10 elements from the list
    temp = temp[-10:]
    time_arr = time_arr[-10:]
    plt.xlabel('Time')
    plt.ylabel('Temp (deg C)')
    plt.xticks(rotation=90)
    plt.subplots_adjust(bottom=0.30)
    plt.plot(time_arr, temp, 'r-', label='Temp against Time' ) # Plot the data
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.show()


def main():
    plotting()


main()
