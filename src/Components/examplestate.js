const [jsonForReportEditing, setJsonForReportEditing] = useState({
  executive_summary: [
    {
      id: 1,
      mainheading: 'Executive Summary',
      contents: '',
      subcontents: [
        {
          id: 1,
          heading: 'Background',
          contents:
            'Healthcare workers (HCW) are exposed to occupational hazard of sharp injuries, commonly referred to as needle stick injuries. World Health ',
          subcontents: [],
        },
        {
          id: 2,
          heading: 'Objective/Aim',
          contents:
            'To evaluate the safety, efficacy, cost-effectiveness, organizational and psychological/social/ethical issues of needleless Vacutainer system for blood collection.',
          subcontents: [],
        },
        {
          id: 3,
          heading: 'Technical Features',
          contents:
            'A total of 383 titles were identified through the Ovid interface and PubMed. There were six articles included in this review; one RCT, two pre and post intervention studies, and three cross sectional studies.',
          subcontents: [],
        },
        {
          id: 4,
          heading: 'Methods',
          contents: 'Electronic databases were ',
          subcontents: [
            {
              id: 1,
              subheading: 'Searching',
              contents:
                'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
              subcontents: [],
            },
          ],
        },
        {
          id: 5,
          heading: 'Results and Discussions',
          contents: 'A total of 383 titles were ',
          subcontents: [
            {
              id: 1,
              subheading: 'Critical Appraisal of the Literatures',
              contents:
                'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
              subcontents: [],
            },
            {
              id: 2,
              subheading: 'Efficacy / Effectiveness',
              contents: '',
              subcontents: [
                {
                  id: 1,
                  subheading: 'Needle sticks injuries',
                  contents: 'There was limited ',
                  subcontents: [],
                },
                {
                  id: 2,
                  subheading: 'Sample Hemolysis',
                  contents:
                    'The evidence on sample hemolysis is inconclusive whereby one RCT reported a lower hemolysis rate of blood samples drawn from Vacutainer ',
                  subcontents: [],
                },
              ],
            },
            {
              id: 3,
              subheading: 'Safety',
              contents:
                'There was no retrievable evidence on the safety of needleless Vacutainer system for blood collection. The BD Vacutainer Systems had received 510(k) from US Food and Drug Administration.',
              subcontents: [],
            },
            {
              id: 4,
              subheading: 'Psychological / Social / Ethical',
              contents: 'There was ',
              subcontents: [],
            },
            {
              id: 5,
              subheading: 'Cost / Cost-Effectiveness',
              contents:
                'Based on the available data, cost-effectiveness of needleless vacutainer system could not be determined. However, it is estimated that needleless vacutainer system will require additional investment of approximately MYR 134 to MYR 282 million for its utilisation within MOH.',
              subcontents: [],
            },
            {
              id: 6,
              subheading: 'Organizational',
              contents:
                'Healthcare workers who are using needleless Vacutainer system need to be trained.',
              subcontents: [],
            },
            {
              id: 7,
              subheading: 'Limitation',
              contents:
                'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
              subcontents: [],
            },
          ],
        },
      ],
    },
  ],
  background: [
    {
      id: 2,
      mainheading: 'Background',
      contents: ' Healthcare workers (HCW) are',
      subcontents: [],
    },
  ],
  objective: [
    {
      id: 3,
      mainheading: 'Objective/Aim',
      contents:
        'To evaluate the safety, efficacy, cost-effectiveness, organizational and psychological/social/ethical issues of needleless Vacutainer system for blood collection.',
      subcontents: [],
    },
  ],
  feature: [
    {
      id: 4,
      mainheading: 'Technical Features',
      contents: '',
      subcontents: [
        {
          id: 1,
          heading: 'Vacuum extraction tube systems',
          contents: 'The use ',
          subcontents: [],
        },
        {
          id: 2,
          heading: 'Needleless system',
          contents:
            'A needleless system refers to a device that does not use needles for the collection of body fluids or administration of medication or fluid after initial IV access is established.8 There are two types of needleless devices that can be used in phlebotomy:',
          subcontents: [
            {
              id: 1,
              subheading: 'Needleless connector',
              contents: 'Needleless ',
              subcontents: [],
            },
            {
              id: 2,
              subheading: 'Needleless transfer device',
              contents: 'Needleless transfer ',
              subcontents: [],
            },
          ],
        },
      ],
    },
  ],
  method: [
    {
      id: 5,
      mainheading: 'Methods',
      contents: '',
      subcontents: [
        {
          id: 1,
          heading: 'Searching',
          contents: 'Electronic databases',
          subcontents: [],
        },
        {
          id: 2,
          heading: 'Selection',
          contents:
            'A reviewer screened the titles and abstracts against the inclusion and exclusion criteria and then evaluated the selected full text articles for final article selection. The inclusion and exclusion criteria were: ',
          subcontents: [],
        },
      ],
    },
  ],
  result: [
    {
      id: 6,
      mainheading: 'Results and Discussions',
      contents:
        'The evidence on sample hemolysis is inconclusive whereby one RCT reported a lower hemolysis rate of blood samples drawn from Vacutainer venepuncture ',
      subcontents: [
        {
          id: 1,
          heading: 'Critical Appraisal of the Literatures',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
        {
          id: 2,
          heading: 'Efficacy / Effectiveness',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [
            {
              id: 1,
              subheading: 'Needle sticks injuries',
              contents:
                'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
              subcontents: [],
            },
            {
              id: 2,
              subheading: 'Sample Hemolysis',
              contents:
                'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
              subcontents: [],
            },
          ],
        },
        {
          id: 3,
          heading: 'Safety',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
        {
          id: 4,
          heading: 'Psychological / Social / Ethical',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
        {
          id: 5,
          heading: 'Cost / Cost-Effectiveness',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
        {
          id: 6,
          heading: 'Organizational',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
        {
          id: 7,
          heading: 'Limitation',
          contents:
            'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
          subcontents: [],
        },
      ],
    },
  ],
  conclusion: [
    {
      id: 7,
      mainheading: 'Conclusion',
      contents:
        'A total of 383 titles were identified through the Ovid interface and PubMed. There were six articles included in this review; one RCT, two pre and post intervention studies, and three cross sectional studies.',
      subcontents: [],
    },
  ],
});

// state backup

// const [jsonForReportEditing, setJsonForReportEditing] = useState({
//   executive_summary: [
//     {
//       id: 1,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   background: [
//     {
//       id: 2,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   objective: [
//     {
//       id: 3,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   feature: [
//     {
//       id: 4,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   method: [
//     {
//       id: 5,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   result: [
//     {
//       id: 6,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
//   conclusion: [
//     {
//       id: 7,
//       mainheading: '',
//       contents: '',
//       subcontents: [],
//     },
//   ],
// });
