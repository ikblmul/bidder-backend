pacakge contain 4 parent folder that diff purpose

data-source <- control flow data that crawling by application such as database, api create pentagon data pattern

domain <- is living of two implementation such as models that control data stucture in application for general comunication, second is repositories that work for bridge between data-sources and the use cases, third is orm that hold external orm from application that calling in repository

usecases <- is domain / bussiness logic living that hold all application behaviour that code will be change every change of logical change

infrastucture <- living the core of http response or presentation layer
