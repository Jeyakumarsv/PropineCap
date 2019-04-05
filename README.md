
# PropineCap

### Question 1 - Design/Writing
#### In this question, we're looking at how you approach problem solving, and how clearly you convey your ideas. An effective engineer not only build things that work, a large part of their time is spent communicating how that worked and helping others.

#### Assume you are a courier company. How do you help your customers create delivery orders efficiently? Assume there are 3 types of customers. Customers that create 1 delivery every week, 10 deliveries a day, and 1000 deliveries a day. Describe how you would solve this problem. Walk us through your assumptions. No code needed.
### Answer 
In our case, we have 3 kinds of customers 
1. Customer creating morethan 1000 delivery 
2. Customer creating 10 deliveries a day 
3. Customer creating 1 delivery in a week

All customers are important to us and especially the customer who is giving more business to us. So we need to work with them to simplify the process of creating delivery order.
Here I consider, web portal and Mobile Applications are used to create delivery order.
Customers can create delivery order either from Web Portal or Mobile Applications by providing Pickup Location and Delivery location and articles details. This Web and Mobile Apps is enough and effective for 
Customer 2 and Customer 3 since their number of delivery orders are few.

For Customer 1, Creating thousands of delivery orders is huge and it needs lots of man power to do that. But we can automate the delivery creation for such case. 

**My Solution for Customer 1:**

- To help the customers creating 1000s of orders a day, we require Pickup locations details, Delivery location details, articles specifiation , Delivery priority, Expected Delivery date. 
- This can be submitted to our centralized server through FTP as a Text File or Excel File as list of record/row.
- or this data file can be uploaded to our server through Web Portal
- Our Application can read from this shared location/Uploaded file and create delivery orders from the file provided and send a mail to customer with referece Delivery order number and Invoice Amount for delivery. 
- And also user can login to web portal to get tracking number and delivery order status.
  
  This same solution can be also used for Customer 2 as well even though they have few orders a day. But automation well help them to submit the orders faster.
  
  
  Thanks :+1:
