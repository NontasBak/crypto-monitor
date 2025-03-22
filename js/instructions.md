The goal of this assignment is to implement a system that will asynchronously receive transaction information for the symbols:

BTC-USDT, ADA-USDT, ETH-USDT, DOGE-USDT, XRP-USDT, SOL-USDT, LTC-USDT, BNB-USDT

from the OKX Websocket public channel wss://ws.okx.com:8443/ws/v5/public.

1. It will record transactions in files (different for each symbol) at the moment it receives the information.
2. Every minute, on the minute, it will calculate for each symbol the moving average of transaction prices and total volume of the most recent 15 minutes and save it to a file immediately.
3. Every minute, on the minute, it will calculate the Pearson correlation of the most recent 8 moving averages with the vectors of moving averages from all cryptocurrencies and determine with which currency and at which past time point the maximum correlation is achieved for each currency.

So every minute we will do the above 2-3 and at irregular time points item 1.

For each symbol, the following files will be written: 1) transactions, 2) 15-minute moving average per minute, 3) correlation coefficient and time position of the maximum. The moving average, correlation coefficient, and position of the maximum are calculated "live," not with post-processing.

We want to minimize the sum of the delays (absolute differences) from the reference times. We define delay as the time interval from when we write the information minus the time when we received the information or the absolute value of the difference from when we should have posted it (on the minute, every minute).

We are also interested in avoiding time drift, that is, the accumulation of delays and not managing to do the calculations for some minute.

The program should run in the user space and not in the kernel space of the Raspberry Pi. Results from simulation or execution on a computing system other than Raspberry Pi will not be accepted.
Submit:

- A 4-page report containing:
    a. Detailed description of the implementation method.
    b. Diagram showing the time difference (positive or negative) at which a task is executed (after or before a deadline) and the percentage of time the CPU remains idle.
    c. Comments and observations on code and results showing that our program can operate for long periods of time (days, not hours) and records data without losses and without stopping if something happens to the network.
- A pointer to the cloud with your program code and the data files that were collected continuously for at least 48 hours.
- Bonus: Study and suggest ways to present the correlation results to predict future values.

Use the producer-consumer methodology to assign tasks to threads that will wait for data or wait for a specific time to arrive in order to perform the logging or computation work.