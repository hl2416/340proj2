$(document).ready(function()
{
  //Pull all About information
  xhr('get', {path: '/about'}, '#about').done(function(json)
  {
    $('#about').append('<div id = "aTitle">' + json.title + '</div><div id = "aDes">' + json.description + '</div><div id = "aQuote">"' + json.quote + '"<div id = "aQAuth">- '
     + json.quoteAuthor + '</div></div>');
  });
  //Pull all Degrees information with modal display
  xhr('get', {path: '/degrees'}, '#degrees').done(function(json)
  {
    //Undergraduate Degrees
    $('#degrees').append('<div id = "DT"> Undergraduate Degrees </div>')
    $.each(json.undergraduate, function(i, degree)
    {
      $('#degrees').append('<div id = "' + degree.degreeName + '" class = "modal"><div>' + degree.title + '</div><hr><div>' + degree.description
       + '</div><hr><div> Concentrations </div></div>');
      $('#degrees').append('<a href = "#' + degree.degreeName + '" rel = "modal:open" id = "deg">' + degree.title + '</a>');
      $.each(degree.concentrations, function(i, concentration)
      {
        $('#' + degree.degreeName).append('<li>' + concentration + '</li>');
      });
      $('#' + degree.degreeName).append('<div id = "close"><a href = "#" rel = "modal:close" id = "deg"> Close </a></div>');
    });
    //Graduate Degrees
    $('#degrees').append('<div id = "DT" class = "D2"> Graduate Degrees </div>')
    $.each(json.graduate, function(i, degree)
    {
      //if it does not have a title then certificates
      if(!degree.title)
      {
        $('#degrees').append('<div id = "ET" class = "D2"> Graduate Advanced Certificates </div>');
        $.each(degree.availableCertificates, function(i, aCert)
        {
          $('#degrees').append('<li id = "cert">' + aCert + '</li>');
        });
      }
      else
      {
        $('#degrees').append('<div id = "' + degree.degreeName + '" class = "modal"><div>' + degree.title + '</div><hr><div>' + degree.description
         + '</div><hr><div> Concentrations </div></div>');
        $('#degrees').append('<a href = "#' + degree.degreeName + '" rel = "modal:open" id = "deg">' + degree.title + '</a>');
        $.each(degree.concentrations, function(i, concentration)
        {
          $('#' + degree.degreeName).append('<li>' + concentration + '</li>');
        });
        $('#' + degree.degreeName).append('<div id = "close"><a href = "#" rel = "modal:close" id = "deg"> Close </a></div>');
      }
    });
  });
  //Pull all Minors information with modal display
  xhr('get', {path: '/minors'}, '#minors').done(function(json)
  {
    $('#minors').append('<div id = "BT"> Minors </div>')
    $.each(json.UgMinors, function(i, minors)
    {
      $('#minors').append('<div id = "' + minors.name + '" class = "modal"><div>' + minors.title + '</div><hr><div>' + minors.description
       + '</div><hr><div> Courses </div></div>');
      $('#minors').append('<div id = "min"><a href = "#' + minors.name + '" rel = "modal:open" id = "deg">' + minors.title + '</a></div>');
      $.each(minors.courses, function(i, courses)
      {
        $('#' + minors.name).append('<li>' + courses + '</li>');
      });
      $('#' + minors.name).append('<hr>' + minors.note);
      $('#' + minors.name).append('<div id = "close"><a href = "#" rel = "modal:close" id = "deg"> Close </a></div>');
    });
  });
  //Pull all Employment information with modal display
  xhr('get', {path: '/employment'}, '#employment').done(function(json)
  {
    //intro with two pieces of content
    $('#employment').append('<div id = "ET">' + json.introduction.title + '</div>');
    $.each(json.introduction.content, function(i, content)
    {
      $('#employment').append('<div id = "deg">' + content.title + '</div><div id = "cert">' + content.description + '</div>');
    });
    //statistics
    $('#employment').append('<div id = "deg">' + json.degreeStatistics.title + '</div>');
    $.each(json.degreeStatistics.statistics, function(i, stats)
    {
      $('#employment').append('<li id = "cert">' + stats.value + ' ' + stats.description + '</li>');
    });
    //employers
    $('#employment').append('<div id = "deg">' + json.employers.title + '</div>');
    $.each(json.employers.employerNames, function(i, eNames)
    {
      $('#employment').append('<li id = "cert">' + eNames + '</li>');
    });
    //careers
    $('#employment').append('<div id = "deg">' + json.careers.title + '</div>');
    $.each(json.careers.careerNames, function(i, cNames)
    {
      $('#employment').append('<li id = "cert">' + cNames + '</li>');
    });
    //the coop table with modal display and datatable
    $('#tables').append(`
      <div id = 'cp' class = 'modal'>
        <table id = 'coT'>
          <thead>
            <tr>
              <th> Employer </th>
              <th> Degree </th>
              <th> City </th>
              <th> Term </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div id = "close"><a href = '#' rel = 'modal:close' id = "deg"> Close </a></div>
      </div>
    `);

    $.each(json.coopTable.coopInformation, function(i, coop)
    {
      $('#coT tbody').append('<tr><td>' + coop.employer + '</td><td>' + coop.degree + '</td><td>' + coop.city + '</td><td>' + coop.term + '</td></tr>');
    });

    $('#coT').DataTable();
    //the employer table with modal display and datatable
    $('#tables').append(`
      <div id = 'emp' class = 'modal'>
        <table id = 'empT'>
          <thead>
            <tr>
              <th> Employer </th>
              <th> Degree </th>
              <th> City </th>
              <th> Title </th>
              <th> Start Date </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div id = "close"><a href = '#' rel = 'modal:close' id = "deg"> Close </a></div>
      </div>
    `);

    $.each(json.employmentTable.professionalEmploymentInformation, function(i, empI)
    {
      $('#empT tbody').append('<tr><td>' + empI.employer + '</td><td>' + empI.degree + '</td><td>' + empI.city + '</td><td>' + empI.title + '</td><td>' + empI.startDate + '</td></tr>');
    });

    $('#empT').DataTable();
  });
  //Pull faculty information with modal display
  xhr('get', {path: '/people'}, '#people').done(function(json)
  {
    $('#people').append('<div id = "BT">' + json.title + '</div><div id = "deg">' + json.subTitle + '</div>');
    $.each(json.faculty, function(i, faculty)
    {
      $('#people').append('<div id = "' + faculty.username + '" class = "modal"><img src="' + faculty.imagePath + '"/><hr><div>' + faculty.name + '</div><hr><div>' + faculty.tagline
       + '</div><hr><div>' + faculty.title + '</div><hr><div> Interest Area <div>' + faculty.interestArea + '</div></div><hr><div> Office <div>' + faculty.office
       + '<div></div><hr><div> Website <div><a href = "' + faculty.website + '">' + faculty.website + '</a></div></div><hr><div> Phone <div><a href = "tel:' + faculty.phone + '">'
       + faculty.phone + '</a></div></div><hr><div> Email <div><a href = "mailto:' + faculty.email + '">' + faculty.email
       + '</a></div></div><hr><div> Twitter <div><a href = "https://twitter.com/' + faculty.twitter + '">' + faculty.twitter
       + '</a></div></div><hr><div> Facebook <div><a href = "https://facebook.com/' + faculty.facebook + '">' + faculty.facebook + '</a></div></div><hr>');
       $('#people').append('<hr><div id = "BT"><img src="' + faculty.imagePath + '"/><div><a href = "#' + faculty.username + '" rel = "modal:open" id = "cert">' + faculty.name + '</a></div></div>');
       $('#' + faculty.username).append('<div id = "close"><a href = "#" rel = "modal:close" id = "deg"> Close </a></div>');
    });
  });

  $(function()
  {
    $('nav').stickynav();
  });
});

function xhr(getPost, data, section)
{
  return $.ajax(
  {
      type: getPost,
      url: './proxy.php',
      data: data,
      dataType: 'json',
      cache: false,
      async: true,
      beforeSend: function()
      {
        //$(section).append('<img src="assets/media/loading.gif" class="spinner"/>');
      }
  }).always(function()
  {
    $(section).find('.spinner').fadeOut(500, function()
		{
			$(this).remove();
		});
  }).fail(function(err)
  {
    console.log(err);
  });
}
