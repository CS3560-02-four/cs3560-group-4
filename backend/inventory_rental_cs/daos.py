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
    
    #specific methods: add cart item for student or get all of a student's cart items
    #get cart items associated with a student account
    
    #add specified item to the cart of the specified student
    def add_item_to_cart(account_id, item: models.Item, quantity=1):
        cart_item = models.CartItem(0, item.id, account_id, quantity)
        CartItemDao.insert_cart_item(cart_item)
    
    #get all cart items assigned to the specified account
    def get_student_cart_items(account_id) -> list[models.CartItem]:
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM cart_item\
                       WHERE account_id={account_id}")
        rows = cursor.fetchall()
        result = [models.CartItem(r[0], r[1], r[2], r[3]) for r in rows]
        return result
    