import time
import requests
import random

# temperature = [23,24,25,23,21,22,24,26,27,26]
# humidity = [70,75,80,65,60,65,70,75,80,75]
#
# for i in range(len(temperature)):
#     print("Temperature: ", temperature[i], "Humidity: ", humidity[i])
#     url = "https://api.thingspeak.com/update?api_key=5D0YQ8SVIXEUUGC3&field1=0"
#     response = requests.get(url + str(temperature[i]) + "&field2=" + str(humidity[i]))
#     time.sleep(20)
#

temp = []
hum = []
for i in range(35):
    temp.append(random.randint(20,31))
    hum.append(random.randint(60,100))
    url = "https://api.thingspeak.com/update?api_key=5D0YQ8SVIXEUUGC3&field1="
    response = requests.get(url + str(temp[i]) + "&field2=" + str(hum[i]))
    print("Temperature: ", temp[i], "Humidity: ", hum[i])
    print(response.text)
    time.sleep(20)
