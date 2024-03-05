<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Arbeiten mit mathematischen Funktionen</title>
</head>

<body>
	<h1>Arbeiten mit mathematischen Funktionen</h1>
	<?php
		/*
		
			https://www.php.net/manual/en/book.math.php
		*/
	
		$seiteA=10;
		$seiteB=20;
		$umfang = (2*$seiteA)+(2*$seiteB);
		echo $umfang;
		// Berechnung der Diagonalen
		// Wurzel aus seiteA^2 + seiteB^2
		echo "<br>";
		echo sqrt(pow($seiteA,2)+pow($seiteB,2));
		echo "<br>";
		
	
	?>
</body>
</html>