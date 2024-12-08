import matplotlib.pyplot as plt
import numpy as np
import datetime
import csv

max_estimate = 75  #Current total estimate

with open("Burn-Up-Chart/log.csv", "r") as file:
    dates = []      # will hold the Dates of the log.csv
    estimates = []  # will hold the estimates done at the corresponding date

    # Load the dates and estimates from the log.csv
    csvFile = csv.reader(file)
    current_estimate = 0
    for line in csvFile:
        dates.append(datetime.datetime.strptime(line[0], '%Y-%m-%d').date())
        current_estimate += int(line[1])
        estimates.append(current_estimate)


    date_pos = np.linspace(1, len(dates), len(dates))   # linear array of all dates for ploting.
    
    plt.axis([0,len(dates)+5, 0, max_estimate+5]) # Fixes the viewport for the plot
    plt.hlines(max_estimate, 0, len(dates)+5) # Plots the total estimate line (Goal line)

    plt.title("Burn Up Chart")
    plt.xlabel("Dates in days starting 21.10.2024")
    plt.ylabel("Estimates")

    plt.plot(date_pos, estimates) # Plots a line with the done estimates
    plt.plot(date_pos, estimates, 'o') # Plors Dots for the done estimates
    plt.savefig("Burn-Up-Chart/Burnup-plot.png")

