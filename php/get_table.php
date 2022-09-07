<?php
session_start();

if (isset($_SESSION['attempts'])) {
        echo ("<thead>
            <tr>
            <th>№</th>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Result</th>
            <th>Attempt time</th>
            <th>Process time</th>
            </tr>
            </thead>"
    );

    echo ("<tbody>");

    $n_rows = sizeof($_SESSION['attempts']);

    foreach (array_reverse($_SESSION['attempts']) as $index => $attempt) {
        echo ('<tr>');

        printf('<td>%s</td>', $n_rows - $index);

        printf('<td>%s</td>', $attempt['x']);
        printf('<td>%s</td>', $attempt['y']);
        printf('<td>%s</td>', $attempt['r']);

        if ($attempt['hit']) {
            echo ('<td> <p class="status status-hit">HIT</p></td>');
        } else {
            echo ('<td> <p class="status status-miss">MISS</p></td>');
        }

        printf('<td>%s</td>', date('Y-m-d H:i:s', $attempt['attempt_time']) . ' UTC');

        printf('<td>%s ms</td>', $attempt['process_time']);

        echo ('</tr>');
    }

    echo ("<tbody>");
}


