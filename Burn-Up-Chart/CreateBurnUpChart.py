import matplotlib.pyplot as plt
import numpy as np
import datetime
import csv
import matplotlib.dates as mdates

max_estimate = 76  #Current total estimate

with open("Burn-Up-Chart/log.csv", "r") as file:
    dates = []      # will hold the Dates of the log.csv
    allDates = []   # will hold all the dates from the log.csv
    estimates = []  # will hold the estimates done at the corresponding date

    # Load the dates and estimates from the log.csv
    csvFile = csv.reader(file)
    current_estimate = 0
    for line in csvFile:
        date = datetime.datetime.strptime(line[0], '%Y-%m-%d').date()
        allDates.append(date)
        if (date <= datetime.datetime.today().date()):
            dates.append(date)
            current_estimate += int(line[1])
            estimates.append(current_estimate)


    date_pos = np.linspace(1, len(dates), len(dates))   # linear array of all dates for ploting.
    
    #This Parte sets the x-axis up so that it shows nice dates
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d,%m,%Y'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=7))
    plt.gcf().autofmt_xdate()

    plt.yticks(np.arange(0, max_estimate + 5, step = 5))
    plt.axhline(max_estimate) # Plots the total estimate line (Goal line)
    plt.axvline(datetime.datetime.today().date(), linestyle = '-', color = 'gray')

    plt.grid(True)

    plt.title("Burn Up Chart")
    plt.xlabel("Dates")
    plt.ylabel("Estimates")

    plt.plot([allDates[0], allDates[len(allDates) - 3]], [0, max_estimate], linestyle='-', color='green') #-3 sets the last date to the last Friday
    plt.plot(dates, estimates, color='orange') # Plors Dots for the done estimates
    plt.savefig("Burn-Up-Chart/Burnup-plot.png")

