/*************************************************/
/*  Program to Covert Country Name to Upper Case */
/*  By: Jeyakumar                                */
/*************************************************/
/* Country JSON http://country.io/names.json */

var csv = require('ya-csv');
var request = require('request');
const _cliProgress = require('cli-progress');
//var endOfLine = require('os').EOL;
var country_all = [];
var output_list = [];
var counter = 0;
var counter_all = 0;
//const c_uploadFileName = 'abcnews-date-text.csv';
const c_uploadFileName = 'abcnews-test.csv';
const c_downloadFileName = './Output_File.csv';
const bar1 = new _cliProgress.Bar({ format: '{bar}] {percentage}%  | Records Processed: {counter}' }, _cliProgress.Presets.shades_classic);
// start the progress bar with a total value of 200 and start value of 0
bar1.start(100, 0, { counter: 0 });

(async () => {
    // await request('http://country.io/names.json', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         country_all = JSON.parse(body)  // Getting Country names from API
    //         //console.log('File is being processed...!');
    //         getFile(country_all);
    //     }
    // });

    country_all = await require("./countries2.json");
    //country_all = JSON.parse(country_all);
    getFile(country_all);

})();

// function to download CSV File
async function downloadFile(outputList) {

    require('fs').writeFile(
        c_downloadFileName,
        output_list.join("\n"), "utf8",  // Downloadding File
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
            else {
                console.log('File Save Operation Completed !');
            }
        }
    );
}

// Uploading and processing Country Names in CSV file

async function getFile(CountryList) {

    //console.log("" + JSON.stringify(CountryList));

    // for (i in CountryList) {
    //     console.log( "list 2"+ CountryList[i] )
    // }

    var reader = csv.createCsvFileReader(c_uploadFileName, {
        'separator': ',',
        'quote': '"',
        'escape': '"',
        'comment': '',
    });

    reader.addListener('data', function (data) {
        //writer.writeRecord(data[1][0].toUpperCase());
        /*
            var text = data[1][0].toUpperCase() + data[1].substr(1,data[1].length-1);
        */
        if (counter == 95) {
            counter = 45;
        }
        bar1.update(counter, { counter: counter_all });
        var text_array = data[1].split(" ");
        var text_column1 = data[0];
        var array_length = text_array.length;
        var sentence_output = "";

        var index = 0, next_index = 0;
        var word_check = "";
        var word_check2 = "";
        var results;
        var skip_next = false;
        text_array.forEach(element => {
            // console.log("Ele "+element);
            if (element != undefined && element != "" && element != " ") {
                element = element.trim();

                word_check = element[0].toUpperCase() + element.substr(1);
                //console.log("l " + text_array[index])
                // Make first word of line to upper case
                if (skip_next == true) {
                    skip_next = false;

                }
                else {

                    if (index == 0)
                        var word = word_check;
                    else {
                        word = element;
                        next_index = index + 1;

                        next_word = text_array[next_index];

                        if (next_word != undefined && next_word != "") {
                            word_check2 = next_word[0].toUpperCase() + next_word.substr(1);
                            word_check2 = word_check + " " + word_check2;
                        }
                        results = function (country) {
                            var i = null;
                            for (i in CountryList) {
                                //console.log("Country 1 "+i[0] + "City "+ country[0])
                                if (i === country) {
                                    return true;
                                }
                                for (j in CountryList[i])  // Loop to convert Cities Names
                                {
                                    //console.log("City "+CountryList[i][j]);
                                    //console.log("Country "+country[0] + "City "+ CountryList[i][j][0])
                                    if (country[0] !== CountryList[i][j][0]) continue;

                                    if (CountryList[i][j] === country) {
                                        return true;
                                    }

                                }
                            }


                            return false;
                        };

                        if ((results(word_check))) {
                            word = word_check;
                        }

                        if (results(word_check2)) {
                            word = word_check2;

                            skip_next = true;
                        }

                    }
                    // Concatenating the Words 
                    sentence_output = sentence_output + " " + word;
                }
            }
            index++;
        });
        output_list.push("" + text_column1 + "," + sentence_output.trim()); //+endOfLine
        //console.log(" Headline : " + sentence_output);
        counter++;
        counter_all++;
    });

    reader.addListener('error', function (e) {
        console.error('Oops!');
    });

    reader.addListener('end', function (e) {
        //console.log('File Processing Completed !');
        downloadFile(output_list)
        bar1.update(100);
        bar1.stop();
    });


}

