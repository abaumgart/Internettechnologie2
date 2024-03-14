<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Unbenanntes Dokument</title>
</head>

<body>
	<h1>Beispiel für eine for-Schleife</h1>
	
	<table>
	<?php
		// Die Funktion rand(a,b) erzeugt eine Zufallszahl zwischen a und b. Siehe PHP-Dokumentation
		for($schleifenzaehler=1;$schleifenzaehler<=10;$schleifenzaehler++)
			{
				if($schleifenzaehler!=4)
				{
					echo "<tr><td>Reihe $schleifenzaehler</td><td>".rand(1,15)."</td><td>".rand(1,15)."</td><td>".rand(1,15)."</td></tr>";
				}
			}
	?>
	</table>
</body>
</html>
