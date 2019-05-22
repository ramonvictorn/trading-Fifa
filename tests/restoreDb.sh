  
echo "-----------Restoring Db" 
psql "dbname='fifa-trading' user='ramon' password='Lantec2019' host='127.0.0.1' port='5432'" -f './script_db.sql'
echo "------------DB RESTORED!!" 
