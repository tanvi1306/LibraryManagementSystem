import  {useState,useContext} from 'react'
import BookContext from '../../context/BookContext';
import { FaSearch } from 'react-icons/fa';

const ShowUsers = () => {

  const {Members, searchmember, SearchMembers} = useContext(BookContext);
  const [searchterm, SetSearchterm] = useState("");

  const [visible, setVisible] = useState(15);
  const [show, setShow] = useState(true);

  const showMoreMembers = () => {
    if (visible < Members.length) {
      setVisible((prevValue) => prevValue + 15);
    } else {
      setShow(false);
    }
  };

  const membersToDisplay = (searchterm.length === 0 ? Members : SearchMembers)?.slice(0, visible);
const validMembers = Array.isArray(membersToDisplay) ? membersToDisplay.filter(member => !!member) : [];

return (
  <div className="p-4 sm:ml-64"> 
    <div className="mt-[5.5rem]">

      <div className="flex my-5 justify-end gap-2 items-center">
        <p className="text-xl text-slate-500"><FaSearch/></p>
        <input 
          type="text" 
          className="bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
          placeholder='Search'
          onChange={(e) => {
            SetSearchterm(e.target.value);
            searchmember(e.target.value);
          }}
        />
      </div>

      <div className="overflow-x-scroll">
        <table style={{ width: "-webkit-fill-available" }}>
          <thead className="bg-gray-800 text-white h-11">
            <tr className="text-lg">
              <th className="px-2 text-nowrap">User ID</th>
              <th className="px-2 text-nowrap">User Name</th>
              <th className="px-2 text-nowrap">Total Issued books</th>
              <th className="px-2 text-nowrap">Total Return books</th>
              <th className="px-2 text-nowrap">Total Penalty</th>
            </tr>
            <tr className="border border-slate-500" />
          </thead>

          <tbody className="items-center">
            {validMembers.map((member, index) => {
              const totalissued = member?.bookIssueHistories.length;
              let totalreturnbook = 0;

              member?.bookIssueHistories.map((book) => {
                if (book.return_date !== null) {
                  totalreturnbook++;
                }
              });

              if (member?.uid === 1) {
                return null; // Skip rendering for UID 1
              }

              return (
                <tr
                  key={index + 30}
                  className={`text-center ${index % 2 === 0 ? "bg-slate-50" : "bg-white"} h-12`}
                >
                  <td className="w-40 px-2 text-nowrap">{member?.uid}</td>
                  <td className="w-40 px-2 text-nowrap">{member?.name}</td>
                  <td className="w-40 px-2 text-nowrap">{totalissued}</td>
                  <td className="w-40 px-2 text-nowrap">{totalreturnbook}</td>
                  <td className="w-40 px-2 text-nowrap">{member?.total_penalty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className="justify-center"
          style={{
            display: show && validMembers.length > 10 ? "flex" : "none",
          }}
        >
          <button onClick={showMoreMembers} className="text-white my-2 bg-slate-500 border p-2 rounded-md hover:bg-slate-700">View More</button>
        </div>

      </div>

    </div>
  </div>
);

  
}

export default ShowUsers