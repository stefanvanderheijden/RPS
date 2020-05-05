from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

edgedriver_location = "/Users/Stefan/Documents/msedgedriver"
driver = webdriver.Edge(edgedriver_location)
driver.get('http://localhost:3000/')

#open 7 tabs
for x in range(7):
    driver.execute_script('''window.open("http://localhost:3000/","_blank");''')
    obj = driver.switch_to.alert
    obj.send_keys('Naam ' + str(x))
    obj.accept()

#get the list of all the tabs
tab_list = driver.window_handles

#fill in all the alerts in all the tabs
for x in range(7):
    driver.switch_to_window(driver.window_handles[x])
    obj = driver.switch_to.alert
    obj.send_keys('Naam ' + str(x))
    obj.accept()