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
    def get_item(**kwargs):
        cursor = connection.cursor()
        query = "SELECT * FROM item WHERE "
        for i in kwargs.items():
            query += f"{i[0]}='{i[1]}' AND "
        query = query.strip("AND ")
        cursor.execute(query)
        rows = cursor.fetchall()
        columns = [c.name for c in cursor.description]
        result = []
        for row in rows:
            result.append(dict(zip(columns, row)))
        return result
    
    #get all items
    def get_all_items():
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM item")
        rows = cursor.fetchall()
        columns = [c.name for c in cursor.description]
        result = []
        for row in rows:
            result.append(dict(zip(columns, row)))
        return result