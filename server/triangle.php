<?php
	$par = json_decode($_GET["par"], true);

	$res = array();

	$vertices = array();

	$matrix = array();

	initMatrix();

	calculateVertices();

	calculateTriangles();

	echo json_encode($res,JSON_FORCE_OBJECT);



	function initMatrix(){
		global $matrix;
		$matrix[0] = array(0,0,0);
		$matrix[1] = array(0,0,1);
		$matrix[2] = array(0,1,0);
		$matrix[3] = array(0,1,1);
		$matrix[4] = array(1,0,0);
		$matrix[5] = array(1,0,1);
		$matrix[6] = array(1,1,0);
		$matrix[7] = array(1,1,1);
	}

	function calculateVertices(){
		global $matrix;
		global $par;
		global $vertices;

		for($i = 0; $i<count($matrix); $i++){
			$vertices[$i][0] = $matrix[$i][0] * $par['width'];
			$vertices[$i][1] = $matrix[$i][1] * $par['height'];
			$vertices[$i][2] = $matrix[$i][2] * $par['deep'];
		}
	}

	function calculateTriangles(){
		global $vertices;
		global $res;

		$triangle = array();
		$triangle[] = $vertices[0];
		$triangle[] = $vertices[1];
		$triangle[] = $vertices[2];

		$res[] = $triangle;


		$triangle = array();
		$triangle[] = $vertices[1];
		$triangle[] = $vertices[2];
		$triangle[] = $vertices[3];

		$res[] = $triangle;
////////////////////////////////////////////////

		$triangle = array();
		$triangle[] = $vertices[4];
		$triangle[] = $vertices[5];
		$triangle[] = $vertices[6];

		$res[] = $triangle;



		$triangle = array();
		$triangle[] = $vertices[5];
		$triangle[] = $vertices[6];
		$triangle[] = $vertices[7];

		$res[] = $triangle;

///////////////////////////////////////////////

		$triangle = array();
		$triangle[] = $vertices[0];
		$triangle[] = $vertices[1];
		$triangle[] = $vertices[4];

		$res[] = $triangle;



		$triangle = array();
		$triangle[] = $vertices[1];
		$triangle[] = $vertices[4];
		$triangle[] = $vertices[5];

		$res[] = $triangle;

///////////////////////////////////////////////

		$triangle = array();
		$triangle[] = $vertices[1];
		$triangle[] = $vertices[3];
		$triangle[] = $vertices[5];

		$res[] = $triangle;



		$triangle = array();
		$triangle[] = $vertices[3];
		$triangle[] = $vertices[5];
		$triangle[] = $vertices[7];

		$res[] = $triangle;

///////////////////////////////////////////////

		$triangle = array();
		$triangle[] = $vertices[2];
		$triangle[] = $vertices[3];
		$triangle[] = $vertices[6];

		$res[] = $triangle;



		$triangle = array();
		$triangle[] = $vertices[3];
		$triangle[] = $vertices[6];
		$triangle[] = $vertices[7];

		$res[] = $triangle;

///////////////////////////////////////////////

		$triangle = array();
		$triangle[] = $vertices[0];
		$triangle[] = $vertices[2];
		$triangle[] = $vertices[4];

		$res[] = $triangle;



		$triangle = array();
		$triangle[] = $vertices[2];
		$triangle[] = $vertices[4];
		$triangle[] = $vertices[6];

		$res[] = $triangle;

///////////////////////////////////////////////
	}
