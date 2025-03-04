import { listEvents } from "./sources/perfectmind";
import newWestminster from "./sources/perfectmind/cities/new-westminster.json";
import mapleRidge from "./sources/perfectmind/cities/maple-ridge.json";
import coquitlam from "./sources/perfectmind/cities/coquitlam.json";
import delta from "./sources/perfectmind/cities/delta.json";

const run = async () => {
  const [newWestminsterEvents, mapleRidgeEvents, coquitlamEvents, deltaEvents] =
    await Promise.all([
      listEvents(newWestminster),
      listEvents(mapleRidge),
      listEvents(coquitlam),
      listEvents(delta),
    ]);

  return newWestminsterEvents.concat(
    mapleRidgeEvents,
    coquitlamEvents,
    deltaEvents
  );
};

run().then((res) => {
  console.log(res);
});
