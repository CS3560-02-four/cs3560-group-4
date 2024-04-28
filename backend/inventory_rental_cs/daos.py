from django.db import connection
import datetime
from . import models

#NOTE: when using the INSERT methods and passing an object instance into them,
#it doesn't matter what ID you give the object - ID's are generated automatically
#by the DB. Every time you create an instance of a class to insert it into the DB,
#just set the id to 0. I would put 0 as a default value but python doesn't let me 
#since id is the first parameter of all constructors

#EXAMPLE DATA ACCESS OBJECT FOR ITEM - INCLUDES ALL CRUD METHODS
class ItemDao:
    #add new item, pass instance of Item class
    def insert_item(item: models.Item):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO item (name, description, category)\
                        VALUES ('{item.name}','{item.description}','{item.category}')")
    
    #add new item, pass instance of Item class
    def update_item(item: models.Item):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE item\
                       SET name = {item.name}\
                       SET description = {item.description}\
                       SET category = {item.category}\
                       WHERE item_id = {item.id}")
        
    #delete item by id
    def delete_item(item_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM item\
                       WHERE item_id = {item_id}")

    #get item by keyword args, for example:
    #get_item(id=1)
    #get_item(name="laptop", category="Laptops")
    #etc
    #returns list of matching item objects
    def get_item(**kwargs) -> list[models.Item]:
        cursor = connection.cursor()
        query = "SELECT * FROM item WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows = cursor.fetchall() #returns list of tuples
        result = [models.Item(r[0], r[1], r[2], r[3]) for r in rows]
        return result
    
    #get all items
    #returns list of item objects
    def get_all_items() -> list[models.Item]:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM item")
        rows = cursor.fetchall()
        result = [models.Item(r[0], r[1], r[2], r[3]) for r in rows]
        return result
        
#DAO for CartItem
class CartItemDao:
    #insert CartItem into db
    def insert_cart_item(cart_item: models.CartItem):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO cart_item (item_id, quantity, account_id)\
                       VALUES ({cart_item.item_id},{cart_item.quantity},{cart_item.account_id})")
        
    #only update quantity
    #all other attributes of CartItem are its id and foreign keys
    def update_cart_item_quantity(cart_item_id, new_quantity):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE cart_item\
                        SET quantity={new_quantity}\
                        WHERE cart_item_id={cart_item_id}")
        
    #delete cart item by id
    def delete_cart_item(cart_item_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM cart_item\
                       WHERE cart_item_id={cart_item_id}")
        
    #get cart item by keyword args - general READ method
    def get_cart_item(**kwargs) -> list[models.CartItem]:
        cursor = connection.cursor()
        query = "SELECT * FROM cart_item WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows = cursor.fetchall() #returns list of tuples
        result = [models.CartItem(r[0], r[1], r[2], r[3]) for r in rows]
        return result
    
    # deletes cart items for a given account id
    def clear_cart(account_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM cart_item\
                       WHERE account_id='{account_id}'")
    
# DAO for Account class
class AccountDao:
    #Insert new Account into DB
    def insert_account(account: models.Account):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO account (username,passoword,email,first_name,last_name,address,admin,student,status,balance)\
                       VALUES ('{account.username}','{account.password}','{account.email}','{account.first_name}','{account.last_name}','{account.address}',{account.admin},{account.student},'{account.status}',{account.balance}")

    #General UPDATE method for Account
    #account - instance of Account class
    #updates all attributes in the DB of the account whose ID matches the object's ID
    def update_account(account: models.Account):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE account\
                       SET username='{account.username}'\
                       SET password='{account.password}'\
                       SET email='{account.email}'\
                       SET first_name='{account.first_name}'\
                       SET last_name='{account.last_name}'\
                       SET address='{account.address}'\
                       SET admin={account.admin}\
                       SET student={account.student}\
                       SET status='{account.status}'\
                       SET balance={account.balance}\
                       WHERE account_id={account.id}")
        
    #Quickly update account balance
    #Pass account ID and new balance as arguments
    def update_account_balance(account_id, new_balance):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE account\
                       SET balance={new_balance}\
                        WHERE account_id={account_id}")
        
    #Quickly update account status
    #Pass account ID and new status as arguments
    def update_account_status(account_id, new_status):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE account\
                       SET status={new_status}\
                        WHERE account_id={account_id}")
        
    #DELETE an account
    #find by ID - passed as argument
    def delete_account(account_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM account\
                       WHERE account_id={account_id}")
        
    #SELECT account based on keyword args
    #returns list of Account objects which were found by the query
    def get_account(**kwargs) -> list[models.Account]:
        cursor = connection.cursor()
        query = "SELECT * FROM account WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows = cursor.fetchall() #returns list of tuples
        result = [models.Account(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8],r[9],r[10]) for r in rows]
        return result

# DAO for Rental Appointment/Reservation
class RentalDao:
    # Make Appointment use case - Create
    # rental: Instance of the Rental Model Class
    def insert_rental(rental: models.Rental):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO rental (status, pickup_datetime, return_datetime, account_id) \
                        VALUES ('{rental.status}', '{rental.pickup_date_time}', '{rental.return_date_time}', {rental.student_id})")

    # Get Rental by keyword args, for example:
    # get_rental(rental_id=1)
    # get_rental(status="pending", account_id="6")
    # Returns a list of matching Rental objects - Read
    def get_rental(**kwargs) -> list[models.Rental]:
        cursor = connection.cursor()
        query = "SELECT * FROM rental WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows  = cursor.fetchall()
        result = [models.Rental(r[0], r[1], r[2], r[3], r[4]) for r in rows]
        return result
        
    # Get all Rentals
    # Returns a list of Rental objects - Read
    def get_all_rentals() -> list[models.Rental]:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM rental")
        rows = cursor.fetchall()
        result = [models.Rental(r[0], r[1], r[2], r[3], r[4]) for r in rows]
        return result

    # Confirm Pickup and Confirm Return use cases (reserved, active, complete) - Update
    # rental_id: Specific database rental id
    # status: Rental appointment new status
    def update_rental_status(rental_id, status):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE rental\
                        SET status='{status}'\
                        WHERE rental_id={rental_id}")
        
    # When rental is picked up, update pickup datetime to current datetime
    # rental_id: Specific database rental id
    def update_pickup_datetime(rental_id):
        current_datetime = datetime.datetime.now()
        cursor = connection.cursor()
        cursor.execute(f"UPDATE rental\
                        SET pickup_datetime='{current_datetime}'\
                        WHERE rental_id={rental_id}")
        
    # When rental is returned up, update return datetime to current datetime
    # rental_id: Specific database rental id
    def update_return_datetime(rental_id):
        current_datetime = datetime.datetime.now()
        cursor = connection.cursor()
        cursor.execute(f"UPDATE rental\
                        SET return_datetime='{current_datetime}'\
                        WHERE rental_id={rental_id}")
        
    # Cancel Reservation use case - Delete
    # rental_id: Specific database rental id
    def delete_rental(rental_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM rental\
                        WHERE rental_id={rental_id}")

# DAO for ItemUnit
class ItemUnitDao:

    # Insert a rental item into a rental appointment - Create
    # rental_item: Instance of the RentalItem Model Class
    def insert_rental_item(item_unit: models.ItemUnit):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO item_unit (rental_id, item_id, status)\
                        VALUES ({item_unit.rental_id},{item_unit.item_id},'{item_unit.status}')")
    
    # Get Rental Item by keyword args, for example:
    # get_item_unit(item_unit_id=1)
    # get_item_unit(status="good", rental_id="1")
    # Returns a list of matching Rental Item objects - Read
    def get_item_unit(**kwargs) -> list[models.ItemUnit]:
        cursor = connection.cursor()
        query = "SELECT * FROM item_unit WHERE "
        for i in kwargs.items():
            if i[0] == "rental_id" and i[1] == None:
                query += "rental_id IS null AND"
            else: 
                query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows  = cursor.fetchall()
        result = [models.ItemUnit(r[0], r[1], r[2], r[3]) for r in rows]
        return result
        
    # Get all Rentals Items
    # Returns a list of Rental Item objects - Read
    def get_all_item_units() -> list[models.ItemUnit]:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM item_unit")
        rows = cursor.fetchall()
        result = [models.ItemUnit(r[0], r[1], r[2], r[3]) for r in rows]
        return result
    
    # Mark Item As Damaged Use Case (good or damaged) - Update (Question for Milosz: Shouldn the Item Class do this instead, 
    # since we'd want to keep track of the status of individual items??)
    # item_unit_id: ID of rental item to be updated
    # status: New status of the rental item (good or damaged)
    def update_item_unit_status(item_unit_id, status):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE item_unit\
                        SET status='{status}'\
                        WHERE item_unit_id={item_unit_id}")
        
    def update_item_unit_rental(item_unit_id, rental_id):
        cursor = connection.cursor()
        if rental_id != None:
            cursor.execute(f"UPDATE item_unit\
                            SET rental_id='{rental_id}'\
                            WHERE item_unit_id={item_unit_id}")
        else:
            cursor.execute(f"UPDATE item_unit\
                            SET rental_id=null\
                            WHERE item_unit_id={item_unit_id}")
    
    # Remove a rental item from the rental appointment - Delete
    def delete_item_unit(item_unit_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM item_unit\
                        WHERE item_unit_id={item_unit_id}")
