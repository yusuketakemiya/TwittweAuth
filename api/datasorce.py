# from urllib.parse import urlparse
# import mysql.connector

# url = urlparse('mysql://planning:12446766@192.168.24.51:3306/PlanningDB')

# conn = mysql.connector.connect(
#     host = url.hostname or '192.168.24.51',
#     port = url.port or 3306,
#     user = url.username or 'planning',
#     password = url.password or '12446766',
#     database = url.path[1:],
# )
import mysql.connector

if __name__ == '__main__':
    cnx = mysql.connector.connect(host='192.168.24.51', 
                                  user='planning', 
                                  password='12446766', 
                                  port='3306', 
                                  database='PlanningDB')
    cur = cnx.cursor(buffered=True, dictionary=True)


    # select
    cur.execute('select * from User')
    row = cur.fetchone()

    if row:
        # 出力
        for r in row:
            print(r)

    # データベースから切断
    cur.close()
    cnx.close()