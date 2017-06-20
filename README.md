# Raspberry Pi Dioder Server    [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Overview
This project is mostly intended for personal use and is specifically tailored to my setup, but with very little modification, it is easy to personalize all the features you need.

## Setup

### Required Materials:
- A soldering iron
- Solder and flux
- Wire (I used 22 gauge standard breadboard wire, but almost any small kind will work)
- IKEA Dioder LED Light Kit
- Raspberry Pi w/internet connection (I used the Raspberry Pi 2, but any Pi with GPIO pins will work)

### Process:
Diagram (source: [ffraenz/redoid](https://github.com/ffraenz/redoid))
[![Dioder control unit circuit board](https://cloud.githubusercontent.com/assets/1041468/20233401/7ad2ad82-a86f-11e6-8494-324e583f27c9.jpg)](https://cloud.githubusercontent.com/assets/1041468/20233401/7ad2ad82-a86f-11e6-8494-324e583f27c9.jpg)

1. Open the plastic casing of the Dioder control unit to access the PCB
2. Solder a wire to connect terminal "2" to a ground pin on the GPIO port
3. Solder wires between "R", "G", "B" and `GPIO_4`, `GPIO_17` and `GPIO_18` respectively
4. Install dependencies on your Pi: `apt install nodejs && apt install npm`, and install [pi-blaster](https://github.com/sarfata/pi-blaster) with your preferred build method
5. Clone this repository: `git clone https://github.com/alec-chan/raspberrypi-dioder-server.git`
6. `cd raspberrypi-dioder-server && npm install`
7. `nodejs app.js` to start the server

Now you should be able to connect to your Raspberry Pi's ip address through your browser and be presented with this page:
![image](http://i.imgur.com/1FrhH8P.png)

## API
The raspberry pi dioder server hosts an API for controlling the lights. The API can be interfaced with through HTTP `GET` and `POST` requests.  Currently there are only two endpoints for this API:

## `/submit`
The `/submit` endpoint listens for a `POST` request with a body containing a JSON object formatted like so: `{"off": boolean, "color": string}` the off property tells the server to turn off the light and the color property tells the server what color to transition the lights to.  If off is true, the color property will be disregarded.

## `/status`
The `/status` endpoint allows clients to query the current state of the lights. `/status` listens for a `GET` request and responds with a JSON object: `{"off": boolean, "color": string}`.