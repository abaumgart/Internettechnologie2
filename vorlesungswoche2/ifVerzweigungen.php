<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Unbenanntes Dokument</title>
</head>

<body>
	<h1>Den Programmablauf mit der Anweisung if beeinflussen</h1>
	
	<?php
		/*
		Vergleichsoperatoren
			== Gleich
			!= Ungleich
			> größer als 
			< kleiner als
			>= größer gleich
			<= kleiner gleich

		*/
		$seiteA = 12;
		if($seiteA < 10)
		{ // Code wird ausgeführt, wenn Bedingung wahr ist
		echo "Seite A ist kleiner 10";
		} else 
			{// Code wird ausgeführt, wenn Bedingung falsch ist
				echo "Seite A ist größer 10";
			}
	
	
	?>
</body>
</html>
