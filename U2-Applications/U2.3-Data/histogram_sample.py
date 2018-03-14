import matplotlib.pyplot as plt

someList = [0.2, -0.3, -0.4, -1, 1, 0.3, 0.6, 0.2, 0.14, -0.16, -0.18, 0.25]
plt.hist(someList, bins=[-1, -0.5, 0.0, 0.5, 1])
plt.xlabel('Values')
plt.ylabel('Number of Items')
plt.title('Histogram of Numbers')
plt.axis([-1.1, 1.1, 0, 6])
plt.grid(True)
plt.show()