importPackage(java.io);

(function(args) {
    var templateFileExtension = 'handlebars',
    console = {
        log: print
    },
    showUsage = function() {
      console.log('Usage: java -jar <rhino.jar> rhino-ember-compiler.js --handlebarJs <handlebars Js path> --emberJs <Ember Js path> --jqueryJs <Jquery Js path> --templatesDir <handlebar templates directory> --output <output Js file> --envJs <EnvJs files list[env1.js~env2.js~...]> --helperRegistryFiles <Helper1.js~Helper2.js~...>');
    },
    handlebarJs,
    helperRegistryFiles,
    emberJs,
    jqueryJs,
    templatesDir,
    envJs,
    outputFile,
    templateFiles,
    outStream,
    index,
    templateFile,
    templateContents,
    argumentsParser,
    options;

    argumentsParser = function() {
        var arg, parse = function(args) {
            var options = {};
            args = Array.prototype.slice.call(args);
            arg = args.shift();
            while (arg) {
                if (arg.indexOf("--") === 0) {
                    options[arg.substring(2)] = args.shift();
                }
                arg = args.shift();
            }
            return options;
        };

        return { parse: parse };
    };
    options = new argumentsParser().parse(args);
    handlebarJs = options.handlebarJs;
    helperRegistryFiles = options.helperRegistryFiles;
    emberJs = options.emberJs;
    jqueryJs = options.jqueryJs;
    envJs = options.envJs;
    templatesDir = options.templatesDir;
    outputFile = options.output;

    outStream = new BufferedWriter(new FileWriter(outputFile));

    if (undefined === handlebarJs || undefined === templatesDir) {
        showUsage();
        java.lang.System.exit(1);
    }
    var tempFileList=[];
    function listFilesRecursively(templatesFolder){
        var fileList = new File(templatesFolder).listFiles();
        for (var i = fileList.length - 1; i >= 0; i--) {
            var eachFile = fileList[i];
            if(eachFile.isDirectory()){
                listFilesRecursively(eachFile.getAbsolutePath());
            }
            else{
                tempFileList.push(eachFile);
            }
        };
    }
    listFilesRecursively(templatesDir);
    templateFiles=tempFileList;
    envJs=envJs.split('~');
    helperRegistryFiles=helperRegistryFiles.split('~');
    for (var i = 0; i <=envJs.length - 1; i++) {
        load(envJs[i]);
    };
    load(handlebarJs);
    load(jqueryJs);
    load(emberJs);
    for (var i = 0; i <=helperRegistryFiles.length - 1; i++) {
        load(helperRegistryFiles[i]);
    };
    var output=[];
    output.push('(function(){');
    output.push('\n  var template = Ember.Handlebars.template, templates = Ember.TEMPLATES = Ember.TEMPLATES || {};\n');

    templateFiles = templateFiles.filter(function(fileName) {
        return(fileName.getName().substr(-11) === ("." + templateFileExtension));
    });
    for (index = 0; index < templateFiles.length; index++) {
        templateFile = templateFiles[index];
        templateName = templateFile.getName().replaceAll(('\\.' + templateFileExtension + '$'), '');
        var templateContent = readFile(templateFile.getAbsolutePath());
        console.log(templateName+" -- "+templateFile.getAbsolutePath());
        templateContents = Ember.Handlebars.precompile(templateContent);
        output.push('  templates[\'' + templateName + '\'] = template(' + templateContents + ');\n');
    }

    output.push('}());');

    outStream.write(output.join(''));
    outStream.close();
}(arguments));
