#Überblick
Mit Hilfe der zur Verfügung gestellten Flugdaten, haben wir eine zoombare Karte entwickelt.  
Die Karte zeigt sämtliche im Datenset enthaltene Flugplätze, sowie Linien zwischen ihnen, welche den Flugverkehr darstellen.  
Die Dicke der Linien ist relativ zum Flugaufkommen zwischen zwei Flughäfen.  

#Implementierung
Die interaktive Karte wurde mit Hilfe der Polymaps library erstellt (http://polymaps.org/).  
Polymaps verwendet JavaScript und SVG für die Grafikausgabe und läuft im Webbrowser.  
Für die Kartendaten verwenden wir OpenStreetMap - die Firma Cloudmade betreibt einen kostenlosen Dienst um die Daten abzurufen.  
Die eigentlichen Daten werden in CouchDB gespeichert - eine document-oriented database, die direkt über HTTP angesprochen werden kann.  
Auf diese Art können wir direkt aus der Javascript Oberfläche über Ajax Daten von CouchDB beziehen.  
Für die Ajax Anfragen verwenden wir die jQuery-library.  
CouchDB erlaubt das schreiben so genannter "show-functions" um gespeicherte Dokumente umzuformatieren. Wir haben zwei solcher Funktionen geschrieben, um die Daten ins GeoJSON Format umzuwandeln.  
GeoJSON ist ein verbreiteter Standard zur Formatierung von GeoDaten (http://geojson.org/).  
Dies erleichtert die Verwendung der Polymaps library, da diese die Daten im GeoJSON Format erwartet.  
Um die Daten in CouchDB zu laden, haben wir ein simples Python Skript geschrieben, welches die CSV-files einliest, in JSON übersetzt und als Dokumente in CouchDB abspeichert.

##CSV-Parser
Der CSV-Parser verwendet die Python-Module "csv" und "couchdbkit".  
Er liest die Datensets aus dem Ordner /data ein und wandelt sie in Python Objekte um.  
Die Objekte werden dann über couchdbkit in CouchDB geschrieben. Dabei werden alle CSV-files zu einem CouchDB-Dokument kombiniert - jedem JSON-property in dem Dokument enstpricht dabei einem CSV-Dokument.  
Der Code lässt sich hier einsehen:  
https://github.com/livelycode/flights/blob/master/python/csv2json.py

##CouchDB show-functions
Die "yearly"-function operiert auf den Daten, welche aus yearly.csv extrahiert wurden.  
Sie wandelt die jährlichen Flugdaten in GeoJSON um und ist erreichbar unter:

    GET http://livelycode.iriscouch.com/flights/_design/app/_show/yearly/data

In der Ausgabe enthalten ist ein "width"-property, der relativ zur Passagierzahl berechnet wird.  
Der Code lässt sich hier einsehen:  
https://github.com/livelycode/flights/blob/master/app/shows/yearly.js

Die "airports"-function operiert auf den Daten von airports.csv.  
Sie wandelt die Positionen der Flughäfen in GeoJSON um und ist erreichbar unter:

    GET http://livelycode.iriscouch.com/flights/_design/app/_show/airports/data

Der Code lässt sich hier einsehen:  
https://github.com/livelycode/flights/blob/master/app/shows/airports.js

##Polymaps-Karte
Um die Polymaps-Karte zu erstellen, müssen wir nun lediglich die Quelle für die Kartendaten angeben, sowie die Flugdaten von CouchDB abfragen.  
Zusätzlich werden verschiedene SVG-styles gesetzt, um die Karte lesbarer zu machen.  
Der Code lässt sich hier einsehen:  
https://github.com/livelycode/flights/blob/master/app/_attachments/main.js

#Source
Sämtlicher Quellcode kann hier heruntergeladen werden:  
https://github.com/livelycode/flights