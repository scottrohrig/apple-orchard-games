// Orchard.js
import Tree from '../components/Tree';
import PlaceholderTree from '../components/PlaceholderTree';

const rows = [];
const trees = [];
for (let i = 0; i < 10; i++) {
  rows.push(i);
  for (let j = 0; j < 10; j++) {
    trees.push(j);
  }
}

export default function Orchard() {

  let disabled = true

  return (
    <div>
      <div className='display-banner text-center'>Orchard Page</div>

{/* placeholder tree is at top temporarily to make it easy to find */}
<PlaceholderTree />
      {rows.map((_, i) =>{
        disabled = i > 3 ? true : false
        return(
        <div key={i} className='item'>
          <div className='flex jc-sb'>
            <button className={`btn btn-harvest ${disabled}`} disabled={disabled}>Harvest Row</button>
            {i === 0 &&
              <button className={`btn btn-harvest`}>Harvest Orchard</button>
            }
          </div>
          <div className='item-scroll'>
            {rows.map(x => (
              <Tree key={x} />
            ))}
          </div>
        </div>
      )})}
    </div>
  );
}
