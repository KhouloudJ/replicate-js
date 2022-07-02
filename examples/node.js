import Replicate from '../replicate.js'
// Uncomment and run cors-proxy for use in browser
// let replicate = new Replicate({proxyUrl: "http://localhost:3000"});

// Uncomment and replace with your token for use in node. 
// let replicate = new Replicate({token: "putTokenHere"});

// Hello World - Sanity Test
let helloWorldModel = await replicate.models.get('replicate/hello-world');
let helloWorldPrediction = await helloWorldModel.predict({ text: "test"});
console.log(helloWorldPrediction); // 'hello why'

// Laion Erlich - Generate Logo From Prompt
let erlichModel = await replicate.models.get('laion-ai/erlich');
let erlichPredictor = erlichModel.predictor({ prompt: "test", steps: 50, intermediate_outputs: true, batch_size:2});
let erlichPrediction;
for await(let prediction of erlichPredictor){
    console.log(prediction);// null, ['https://replicate.com/api/models/laion-ai/erlich/files/c5a555c9-5dbc-42eb-a378-b67f80011ac6/current_0.png','https://replicate.com/api/models/laion-ai/erlich/files/2fba769b-1ecc-4be3-a0fb-864c8d659f6c/current_1.png'], ['https://replicate.com/api/models/laion-ai/erlich/files/0f921335-fe50-4d31-a612-ecffd19c08e5/current_0.png','https://replicate.com/api/models/laion-ai/erlich/files/2f593a06-3f29-4986-b0ef-c3b533e87ad1/current_1.png']
    erlichPrediction = prediction;
}

// SwinIR - Upscale Generated Image
let swinModel = await replicate.models.get('jingyunliang/swinir');
let swinPrediction = await swinModel.predict({ image: erlichPrediction[0]});
console.log(swinPrediction); // {file: 'https://replicate.com/api/models/jingyunliang/swinir/files/0d95b680-b8c4-4cf0-a590-8f1f01dfda72/out.png'}
