<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Arbeiten mit Variablen</title>
</head>

<body>
	<?php
		/*
			Variablen:	
				- dürfen keine Leerzeichen enthalten
				- nur Buchstaben und Ziffern. Erste Zeichen muss ein Buchstabe sein
				- Groß- und Kleinschreibung wird unterschieden
				- keine deutschen Umlaute und kein ß
				- Unterstrich _ darf verwendet werden
		*/
		$liter = 20;
		$preis = 1.35;
		$gesamtsumme = $preis * $liter;
		echo $gesamtsumme;
		
	?>
</body>
</html>