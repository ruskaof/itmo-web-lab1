<?php

$start_time = hrtime(true);

if (!(isset($_POST['x']) && isset($_POST['y']) && isset($_POST['r']) && isset($_POST['round']))) {
    if (!isset($_POST['r'])) {
        echo 'r not set';
    }
    if (!isset($_POST['y'])) {
        echo 'y not set';
    }
    if (!isset($_POST['x'])) {
        echo 'y not set';
    }

    echo 'Not enough parameters';
    http_response_code(400);
} else {
    $x = strval(str_replace(',', '.', strval($_POST['x'])));
    $y = strval(str_replace(',', '.', strval($_POST['y'])));
    $r = strval(str_replace(',', '.', strval($_POST['r'])));

    $round = strval($_POST['round']);

    if ($round != '1' && $round != '0') {
        echo 'bad round parameter';
        http_response_code(400);
    }

    $round = boolval(intval(strval($_POST['round'])));
    

    if (!$round && (strlen($x) > 14 || strlen($y) > 14 || strlen($r) > 14)) {
        echo 'Numbers too long';
        http_response_code(400);
    } else if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) {
        echo 'Not numbers or numbers are too long';
        http_response_code(400);
    } else {
        $x = floatval(str_replace(',', '.', strval($_POST['x'])));
        $y = floatval(str_replace(',', '.', strval($_POST['y'])));
        $z = floatval(str_replace(',', '.', strval($_POST['z'])));

    
        function checkTriangleHit($x, $y, $r)
        {
            return $x <= 0 and $x >= -$r and $y >= 0 and $y <= $r / 2 and $r / 2 + 0.5 * $x >= $y;
        }
    
        function checkSectorHit($x, $y, $r)
        {
            return $x >= 0 and $x <= $r / 2 and $y >= 0 and $y <= $r / 2 and $x * $x + $y * $y <= $r * $r / 4;
        }
    
        function checkRectangleHit($x, $y, $r)
        {
            return $x >= 0 and $x <= $r / 2 and $y <= 0 and $y >= -$r;
        }
    
    
    
    
    
        $wasHit = checkTriangleHit($x, $y, $r) || checkSectorHit($x, $y, $r) || checkRectangleHit($x, $y, $r);
    
        $attempt = array(
            'x' => $x,
            'y' => $y,
            'r' => $r,
            'hit' => $wasHit,
            'attempt_time' => time(),
            'process_time' => (hrtime(true) - $start_time) / 1000000
        );
    
        session_start();
    
        if (!isset($_SESSION['attempts'])) {
            $_SESSION['attempts'] = array($attempt);
            echo "added your thing0";
        } else {
            array_push($_SESSION['attempts'], $attempt);
            echo "added your thing";
        }
    
    }

}
