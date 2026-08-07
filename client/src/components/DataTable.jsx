import Loader from './Loader';

const DataTable = ({ columns, data, loading }) => {

  if (loading) {
    return <Loader />;
  }


  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-100 border-b">

          <tr>

            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-sm font-semibold text-gray-600"
              >
                {column.header}
              </th>
            ))}

          </tr>

        </thead>


        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                No records found
              </td>

            </tr>

          ) : (

            data.map((row, rowIndex) => (

              <tr
                key={row._id || rowIndex}
                className="border-b hover:bg-gray-50"
              >

                {columns.map((column, colIndex) => (

                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm text-gray-700"
                  >

                    {column.cell
                      ? column.cell(row)
                      : row[column.accessor]
                    }

                  </td>

                ))}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default DataTable;