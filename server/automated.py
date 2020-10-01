import pyautogui
import time
#pyautogui.PAUSE = 1
#how to use this script:
#make sure that your internet browser is the other screen (for alt+tab) to work.
pyautogui.FAILSAFE = True

pyautogui.hotkey('alt', 'tab')

counter = 0
for i in range(8):
    counter += 1
    time.sleep(1)
    pyautogui.hotkey('ctrl', 't')
    pyautogui.typewrite('http://80.112.186.64:3000/')
    time.sleep(0.1)
    pyautogui.press('enter')
    time.sleep(0.5)
    pyautogui.typewrite('Player' + str(counter))
    pyautogui.press('enter')
    time.sleep(1)
