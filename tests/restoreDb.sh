  
echo "-----------Restoring Db" 
psql "dbname='fifa-trading' user='postgres' password='4415253' host='127.0.0.1' port='5432'" -f './script_db.sql'
echo "------------DB RESTORED!!" 
