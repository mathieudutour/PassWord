<?php
			function getValueOfDigit($d)
			{
			   return hexdec($d);
			}
			 
			function convert($src, $dstAlphabet)
			{
			   $srcBase = 16;
			   $dstBase = strlen($dstAlphabet);
			 
			   $wet     = $src;
			   $val     = 0;
			   $mlt     = 1;
			 
			   for($i=0;$i<strlen($src);$i++)
			   {
				 $digit  = substr($wet,$i,1);
				 $val    += $mlt * getValueOfDigit($digit);
				 $mlt    *= $srcBase;
			   }
			   $wet          = $val;
			   $ret      = "";
			   $i=1;
			   while($wet>=$dstBase)
			   {
				 $digitVal = $wet % $dstBase;
				 if($digitVal==0)
				 {
					 $digitVal=($digitVal+$i*10) % $dstBase;
					 $i+=1;
				 }
				 $digit    = $dstAlphabet{$digitVal};
				 $ret      = $digit . $ret;
				 $wet /= $dstBase;
			   }
			 
			   $digit    = $dstAlphabet[$wet];
			   $ret          = $digit . $ret;
			   
			   return $ret;
			}

	
	function generate_password($seed){
		$hash=md5($seed);
	  $pass =  convert($hash,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=~!@#$%^&*()_+,./<>?;:[]{}|");	
	  return $pass;
	}

	$is_ajax = $_REQUEST['is_ajax'];
	if(isset($is_ajax) && $is_ajax)
	{
		$pass = $_REQUEST['password'];
		$salt = $_REQUEST['salt'];
		if(isset($pass) && isset($salt) && $salt == 'false')
		{		
			echo "success";	
		}
		else if(isset($pass) && isset($salt))
		{
			echo generate_password($pass . $salt);
		}
		else
			echo "fail";
	}
	
?>