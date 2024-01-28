import { PageProps } from "../../../../.next/types/app/page";

export default function Users(props: PageProps) {
  console.log(props);

  function randomNumber(count: number) {
    return Math.floor(Math.random() * count);
  }
  const count = randomNumber(2);
  // if (count === 1) {
  //   throw new Error("Something went wrong please try again after sometime");
  // }
  return (
    <div>
      <h2 className="text-xl font-bold">Users</h2>
      <div className="overflow-scroll pt-6">
        <p>
          Sunt anim sit culpa officia excepteur nostrud exercitation
          exercitation. Ut do irure nulla elit eu magna dolore id culpa.
          Excepteur et sit ut consectetur est culpa cillum.
        </p>
        <p>
          Sunt anim sit culpa officia excepteur nostrud exercitation
          exercitation. Ut do irure nulla elit eu magna dolore id culpa.
          Excepteur et sit ut consectetur est culpa cillum.
        </p>
        <p>
          Sunt anim sit culpa officia excepteur nostrud exercitation
          exercitation. Ut do irure nulla elit eu magna dolore id culpa.
          Excepteur et sit ut consectetur est culpa cillum.
        </p>
        <p>
          Sunt anim sit culpa officia excepteur nostrud exercitation
          exercitation. Ut do irure nulla elit eu magna dolore id culpa.
          Excepteur et sit ut consectetur est culpa cillum.
        </p>
      </div>
    </div>
  );
}
