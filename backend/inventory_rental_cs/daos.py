from django.db import connection
from . import models

#EXAMPLE DATA ACCESS OBJECT FOR ITEM - INCLUDES ALL CRUD METHODS
class ItemDao:
    #add new item, pass instance of Item class
    def insert_item(item: models.Item):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO item (name, description, quantity, category)\
                        VALUES ({item.name},{item.description},{item.quantity},{item.category})")
    
    #add new item, pass instance of Item class
    def update_item(item: models.Item):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE item\
                       SET name = {item.name}\
                       SET description = {item.description}\
                       SET quantity = {item.quantity}\
                       SET category = {item.category}\
                       WHERE item_id = {item.id}")
        
    #update item quantity by item_id and pass new quantity
    def update_item_quantity(item_id, new_quantity):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE item\
                       SET quantity = {new_quantity}\
                        WHERE item_id = {item_id}")
        
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
        result = [models.Item(r[0], r[1], r[2], r[3], r[4]) for r in rows]
        return result
    
    #get all items
    #returns list of item objects
    def get_all_items() -> list[models.Item]:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM item")
        rows = cursor.fetchall()
        result = [models.Item(r[0], r[1], r[2], r[3], r[4]) for r in rows]
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
    def delete_cart_item(card_item_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM cart_item\
                       WHERE cart_item_id={card_item_id}")
        
    #get cart item by keyword args - general READ method
    def get_cart_item(**kwargs) -> list[models.CartItem]:
        cursor = connection.cursor()
        query = "SELECT * FROM card_item WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows = cursor.fetchall() #returns list of tuples
        result = [models.CartItem(r[0], r[1], r[2], r[3]) for r in rows]
        return result
    
# DAO for Rental Appointment/Reservation
class RentalDao:
    # Make Appointment use case - Create
    # rental: Instance of the Rental Model Class
    def insert_rental(rental: models.Rental):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO rental (rental_id, status, pickup_datetime, return_datetime, account_id) \
                        VALUES ({rental.id}, '{rental.status}', '{rental.pickup_date_time}', '{rental.return_date_time}', {rental.student_id})")

    # TODO: Read rental

    # Confirm Pickup and Confirm Return use cases (pending, picked up, returned) - Update
    # rental_id: Specific database rental appointment id
    # status: Rental appointment new status
    # Question for team: Would we want to implement the ability to change the pickup/return date? Or just keep it simple and don't?
    def update_rental_status(rental_id, status):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE rental\
                        SET status='{status}'\
                        WHERE rental_id={rental_id}")
        
    # Cancel Reservation use case - Delete
    # rental_id: Specific database rental appointment id
    def delete_rental(rental_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM rental\
                        WHERE rental_id={rental_id}")

# DAO for Rental Items
class RentalItemDao:

    # Insert a rental item into a rental appointment - Create
    # rental_item: Instance of the RentalItem Model Class
    def insert_rental_item(rental_item: models.RentalItem):
        cursor = connection.cursor()
        cursor.execute(f"INSERT INTO rental_item (rental_item_id, rental_id, item_id, status)\
                        VALUES ({rental_item.id},{rental_item.rental_id},{rental_item.item_id},'{rental_item.status}')")
        
    # TODO: Read rental_items

    # Mark Item As Damaged Use Case (good or damaged) - Update (Question for Milosz: Shouldn the Item Class do this instead, 
    # since we'd want to keep track of the status of individual items??)
    # rental_item_id: ID of rental item to be updated
    # status: New status of the rental item (good or damaged)
    def update_rental_item_status(rental_item_id, status):
        cursor = connection.cursor()
        cursor.execute(f"UPDATE rental_item\
                        SET status='{status}'\
                        WHERE rental_item_id={rental_item_id}")
    
    # Remove a rental item from the rental appointment - Delete
    def delete_rental_item(rental_item_id):
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM rental_item\
                        WHERE rental_item_id={rental_item_id}")