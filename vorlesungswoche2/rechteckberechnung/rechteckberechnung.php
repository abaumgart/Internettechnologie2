<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Rechteckberechnung</title>
</head>

<body>
	<h1>Ergebnis der Rechteckberechnung</h1>
	<?php
		/*
			https://www.php.net/manual/en/book.math.php
			intval() doubleval()
		*/
	
		
		$seiteA= doubleval($_POST["seiteA"]);
		$seiteB= doubleval($_POST["seiteB"]);
		$textFuerDiagonale = "Rechteckdiagonale: ";
		$textFuerUmfang="Umfang: ";
		$textFuerFlaeche="Rechteckfläche: ";
		$htmlAusgabeStart="<h1>";
		$htmlAusgabeEnde="</h1>";
	
		// Berechnung nur durchführen, wenn die SeiteA kleiner 10 ODER SeiteB<20
		// Logisches Oder ||
		// Logisches Und &&
	
		if(($seiteA<10 && $seiteB<20) )
		{
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
		}
		else
		{
			echo "Vorgaben sind nicht eingehalten.";
		}
	?>
	
	
	
</body>
</html>