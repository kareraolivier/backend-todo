// import { JsonDB, Config } from 'node-json-db';

// // The first argument is the database filename. If no extension is used, '.json' is assumed and automatically added.
// // The second argument is used to tell the DB to save after each push
// // If you set the second argument to false, you'll have to call the save() method.
// // The third argument is used to ask JsonDB to save the database in a human readable format. (default false)
// // The last argument is the separator. By default it's slash (/)
// var db = new JsonDB(new Config('myDataBase', true, false, '/'));

// // Pushing the data into the database
// // With the wanted DataPath
// // By default the push will override the old value
// await db.push('/test1', 'super test');

// // When pushing new data for a DataPath that doesn't exist, it automatically creates the hierarchy
// await db.push('/test2/my/test', 5);

// // You can also push objects directly
// await db.push('/test3', { test: 'test', json: { test: ['test'] } });

// // If you don't want to override the data but to merge them
// // The merge is recursive and works with Object and Array.
// await db.push(
//   '/test3',
//   {
//     new: 'cool',
//     json: {
//       important: 5,
//     },
//   },
//   false,
// );

// /*
// This give you this results :
// {
//    "test":"test",
//    "json":{
//       "test":[
//          "test"
//       ],
//       "important":5
//    },
//    "new":"cool"
// }
// */

// // You can't merge primitives.
// // If you do this:
// await db.push('/test2/my/test/', 10, false);

// // The data will be overriden

// // Get the data from the root
// var data = await db.getData('/');

// // Or from a particular DataPath
// var data = await db.getData('/test1');

// // If you try to get some data from a DataPath that doesn't exist
// // You'll get an Error
// try {
//   var data = await db.getData('/test1/test/dont/work');
// } catch (error) {
//   // The error will tell you where the DataPath stopped. In this case test1
//   // Since /test1/test does't exist.
//   console.error(error);
// }

// // Easier than try catch when the path doesn't lead to data
// // This will return `myDefaultValue` if `/super/path` doesn't have data, otherwise it will return the data
// var data = await db.getObjectDefault<string>('/super/path', 'myDefaultValue');

// // Deleting data
// await db.delete('/test1');

// // Save the data (useful if you disable the saveOnPush)
// await db.save();

// // In case you have an exterior change to the databse file and want to reload it
// // use this method
// await db.reload();
