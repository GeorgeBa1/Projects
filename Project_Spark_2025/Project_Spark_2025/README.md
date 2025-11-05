# Kafka With Spark Streaming

## This repository contains a docker-compose.yml file which when started up creates a zookeeper backend, two kafkas and spark available in a container for submitting streaming jobs.

## Detail Summary

| Container | Image | Tag | Accessible |
|-|-|-|-|
| zookeeper | zookeeper | 3.6.1 | 172.25.0.11:2181 |
| kafka1 | wurstmeister/kafka | 2.12-2.2.0 | 172.25.0.12:9092 |
| kafka2 | wurstmeister/kafka | 2.12-2.2.0 | 172.25.0.13:9092 |
| spark | gettyimages/spark | 2.4.1-hadoop-3.0 | 172.25.0.14 |


## Running Docker Compose
# run the following command in the current folder:
docker-compose up -d

# To view the their status run
docker-compose ps
docker ps  
# all containers should be up and running. if a container is missing run:
docker ps -a
# record its id and run 
docker logs <id> 
# to check what went wrong

## Openining Shell Into Container

# To open up a bash shell inside the spark container run the docker-compose exec command:
docker-compose exec spark bash

# or simply open the containers in VSCode with the container dev package

## Submit the python code to spark along with the jar files:
spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.5 --jars kafka-clients-2.2.0.jar --driver-class-path kafka-clients-2.2.0.jar <python file>


# for fetching data from apis: python3 station_info.py 
#                              python3 station_status.py 
#                              python3 weather_data.py 



## gia na swsoume ta arxeia sthn sqlite tha prepei na dwsoume sto submit kai to jar ths sqlite 
spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.5 --jars kafka-clients-2.2.0.jar --driver-class-path kafka-clients-2.2.0.jar bike_sharing_processing.py

# for displaying topics from console outside containers: 
docker exec -it kafka1 kafka-console-consumer.sh --bootstrap-server 172.25.0.13:9092 --topic <topic> --from-beginning

# to add the kafdrop dashboard
docker run -d --name kafdrop -p 9000:9000 --network kafkanet --ip 172.25.0.15 -e KAFKA_BROKER_CONNECT=172.25.0.12:9092,172.25.0.13:9092 -e JVM_OPTS="-Xms32M -Xmx64M" obsidiandynamics/kafdrop

# to bike_sharing.db exei tous pinakes pou prokuptoun apo to processing twn messages kai prokuptei apo to run ths entolhs sth grammh 46. Sto temp_output csv eixan apothikeutei palaioteres ekdoseis
# twn dedomenwn alla den sumperilifthike logw megethous (2.5GB)