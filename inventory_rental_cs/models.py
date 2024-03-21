class Account():
    def __init__(self, id, username, password, email):
        self.id = id
        self.username = username
        self.password = password
        self.email = email

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return instances of the class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Account()]

    #Update the account in the DB
    def update(self, username = None, password = None, email = None):
        pass

    #Archive
    def delete(self):
        pass

class Student(Account):
    def __init__(self, id, username, password, email, balance, status):
        super().__init__(id, username, password, email)
        self.balance = balance
        self.status = status

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Student()]

    #Update the account in the DB
    def update(self, username = None, password = None, email = None, balance = None, status = None):
        pass

    #Archive
    def delete(self):
        pass

class Staff(Account):
    #Constructor is inherited from Account

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Staff()]

    #Update the account in the DB
    def update(self, username = None, password = None, email = None):
        pass

    #Archive
    def delete(self):
        pass

    
class Item():
    def __init__(self, id, name, descritpion, quantity, category):
        self.id = id
        self.name = name
        self.description = descritpion
        self.quantity = quantity
        self.category = category

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Item()]

    #Update the account in the DB
    def update(self, name = None, description = None, quantity = None, category = None):
        pass

    #Archive
    def delete(self):
        pass

class Cart():
    def __init__(self, id, studentId):
        self.id = id
        self.studentId = studentId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Cart()]

    #Update the account in the DB
    def update(self, studentId = None):
        pass

    #Archive
    def delete(self):
        pass

class CartItem():
    def __init__(self, id, quantity, cartId, itemId):
        self.id = id
        self.quantity = quantity
        self.cartId = cartId
        self.itemId = itemId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [CartItem()]

    #Update the account in the DB
    def update(self, quantity = None, cartId = None, itemId = None):
        pass

    #Archive
    def delete(self):
        pass

class Rental():
    #Comment on datetimes: we will use a date time object instead of a raw string, and use a toString(or whatever it's called)
    #method so that every date time has the same format in the DB
    def __init__(self, id, pickup_date_time, return_date_time, status, studentId):
        self.id = id
        self.pickup_date_time = pickup_date_time
        self.return_date_time = return_date_time
        self.status = status
        self.studentId = studentId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Rental()]

    #Update the account in the DB
    def update(self, pickup_date_time = None, return_date_time = None, status = None, studentId = None):
        pass

    #Archive
    def delete(self):
        pass

class RentalItem():
    def __init__(self, id, status, itemId, rentalId):
        self.id = id
        self.status = status
        self.itemId = itemId
        self.rentalId = rentalId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [RentalItem()]

    #Update the account in the DB
    def update(self, status = None, itemId = None, rentalId = None):
        pass

    #Archive
    def delete(self):
        pass
