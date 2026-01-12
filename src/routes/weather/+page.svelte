<script>
    let { data } = $props();
    $inspect(data);
</script>

<h1>Météo d'{data.meteo.location.name}</h1>
<div>
    <h2>La météo du jour est la suivante :</h2>
    <ul>
        <li>Dernière mise à jour : {data.meteo.current.last_updated}</li>
        <li>Température : {data.meteo.current.temp_c}°</li>
    </ul>
</div>
