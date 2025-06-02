import matplotlib.colors
import matplotlib.pyplot as plt
import numpy as np

# Generate 10 evenly spaced values between 0 and 1
values = np.linspace(0, 1, 10)

# Get the viridis colormap
cmap = plt.get_cmap("viridis")

# Get the colors corresponding to the values
colors_rgba = cmap(values)

# Convert RGBA to hex
for color in colors_rgba:
    print(matplotlib.colors.to_hex(color))
