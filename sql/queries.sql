--OVERDUE PLANTS--


SELECT 
    p.id,
    p.plant_name,
    p.watering_interval_days,
    lw.latest_watered --add the subqeury to the table--
FROM plants p
LEFT JOIN (
    --subquery--
    SELECT plant_id, MAX(watered_at) AS latest_watered
    FROM watering_events
    GROUP BY plant_id
) lw ON p.id = lw.plant_id
WHERE
    --add the constraint--
    lw.latest_watered IS NULL
    OR
    lw.latest_watered + (p.watering_interval_days || ' days')::INTERVAL < NOW();
