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
	
		for($schleifenzaehler=1;$schleifenzaehler<=10;$schleifenzaehler++)
			{
				echo "<tr><td>".rand(1,15)."</td><td>".rand(1,15)."</td><td>".rand(1,15)."</td></tr>";
			}
		
	
	?>
	</table>
</body>
</html>
