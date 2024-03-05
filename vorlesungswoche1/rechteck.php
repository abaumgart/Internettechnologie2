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
		$textFuerDiagonale = "Rechteckdiagonale: ";
		$textFuerUmfang="Umfang: ";
		$textFuerFlaeche="Rechteckfläche: ";
		$htmlAusgabeStart="<h1>";
		$htmlAusgabeEnde="</h1>";
	
		$umfang = (2*$seiteA)+(2*$seiteB);
		// Berechnung der Diagonalen
		// Wurzel aus seiteA^2 + seiteB^2
		$diagonale = sqrt(pow($seiteA,2)+pow($seiteB,2));
		$flaeche = $seiteA*$seiteB;
	
		$zeichenketteDiagonale= $htmlAusgabeStart.$textFuerDiagonale.$diagonale.$htmlAusgabeEnde;
		$zeichenketteUmfang=$htmlAusgabeStart.$textFuerUmfang.$umfang.$htmlAusgabeEnde;
		$zeichenketteFlaeche=$htmlAusgabeStart.$textFuerFlaeche.$flaeche.$htmlAusgabeEnde;
	
		echo $zeichenketteDiagonale;
		echo $zeichenketteUmfang;
		echo $zeichenketteFlaeche;
	
	?>
	
	
	
</body>
</html>