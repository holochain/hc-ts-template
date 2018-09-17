var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var fs = require('fs-extra');
var exec = require('gulp-exec');

/**
 * Build all files
 */
gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});


gulp.task('hc-process', function(){
    var options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: false, // default = false, true means stdout is written to file.contents
        customTemplatingThing: "test" // content passed to lodash.template()
      };
      var reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
    };
    return gulp.src('./**/**')
    .pipe(exec('git checkout <%= file.path %> <%= options.customTemplatingThing %>', options))
    .pipe(exec.reporter(reportOptions));
});

/**
 * Reads dna.json, looks for any zomes that don't have a corresponding src ts file & creates them
 * 
 */
gulp.task('setup', function() {
    console.log('Checking HC DNA Setup');
    const dna = JSON.parse(fs.readFileSync('./dna/dna.json'));
    let tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json'));
    dna.Zomes.forEach(zome => {
        let zomeSrc = zome.CodeFile.replace(".js", ".ts")
        let outfile = `./src/${zomeSrc}`;
        //check for custom functions in the dna for this zome
        
        
        fs.stat(outfile, function(err, stat) {
            if(err == null) {
                console.log('File exists');
                if (!tsconfig.files.includes(`src/${zomeSrc}`)){
                    console.log('Not in tsconfig, adding');
                    tsconfig.files.push(`src/${zomeSrc}`)    
                    console.log(tsconfig.files)
                    fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfig ,null, 4))
                }
                
            } else if(err.code == 'ENOENT') {
                // file does not exist
                console.log(`${zomeSrc} doesn't exit in src. Creating default...`);
                //fs.writeFile('log.txt', 'Some log\n');
                generateZome(outfile, zome)
                
                
                
                //add to the tsconfig
                tsconfig.files.push(`src/${zomeSrc}`)
                

                console.log(tsconfig.files)
                fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfig, null, 4))
            } else {
                console.log('Error! ', err.code);
            }
        });
        
    });
    //console.log(tsconfig.files)
});

const generateZome = (outfile, zome) => {
    const template = './templates/zomeTemplate.ts';
    //create new file if it doesn't exist
    console.log(`Creating ${outfile}`)
    fs.copy(template, outfile, console.log)
    let custom_funcs = [];
        zome.Functions.forEach(func =>{
            console.log(func)
            //create default function
            let defaultFunc = `
            const ${func.Name} =(param1:${func.CallingType}):any=>{
                return null
            }
            `;
            custom_funcs.push(defaultFunc)
        })
        console.log(custom_funcs)
}

gulp.task('test', function() {
    console.log("Tests")
});

gulp.task('test-hcapp', function() {
    //do stuff
});

gulp.task('test-hcui', function() {
    //do stuff
});

gulp.task('start', function() {
    //do stuff
});

gulp.task('start-hcapp', function() {
    //do stuff
});

gulp.task('start-ui', function() {
    //do stuff
});