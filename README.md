This is Yu's react front end

'Yu' is a stock market portfolio management app, where you can keep track of all your stock market transactions. You can also use it as a practice tool before you invest your own money. 

The name 'Yu' comes from Chinese which means fish and surplus. By using this app, I wish you can make surplus on your future investment. 

On the home page, you can see a list of 505 Standard and Poor stocks. Clicking on each stock, you will go to that stock's show page where you can see all the info about that stock. All the data is retrieved real time from Yahoo Finance API by the time you enter the page. 

You will need to log in or register before you can move any further. 

After you log in, you can make a buy order or sell order on that stock's show page. After the transaction, you will be brought to your profile page, where you can see two tables -- Pending Transaction, and Filed Transaction. 

When you buy a stock, if your listed price is lower than the current market price(ex. the current market price is $25 but you only want to pay $20), this order will be added to the pending transaction table. 

At the Yu's back end, it will constantly check the market price, when the market price and your listed price meet(ex. 3 hours after your order, the stock price drops from $25 to $20), the backend will automatically move the order from pending transactions to filed transactions. 

Same logic applies to sell order. 

You will receive a warning if you are going to spend more than your manageable fund in a buy order, or if you are trying to sell more volumes than what you own in a sell order. 

You can delete an order as long as it is still pending. 