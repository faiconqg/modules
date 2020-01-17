import React from 'react'
import SimplePage from 'modules/components/templates/SimplePage'
import SampleContent from './SampleContent'

const Sample: React.FC = () => {
  return (
    <SimplePage header="Overview" center feature>
      <SampleContent />
    </SimplePage>
  )
}

export default Sample
