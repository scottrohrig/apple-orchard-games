// Orchard.js
import Tree from '../components/Tree';

const rows = []
const trees = []
for (let i=0; i < 10; i++) {
  rows.push(i)
  for (let j=0;j< 10; j++){
    trees.push(j)
  }
}

export default function Orchard() {

  return (
    <div>
      <div className='form-label'>Orchard Page</div>
        {rows.map(i => (
          <div key={i} className='item'>
            <div className='item-scroll'>
              {rows.map(x => (
                <Tree key={x} />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
