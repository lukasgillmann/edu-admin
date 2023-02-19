import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import BTable from "./BTable";
import { useState, useEffect } from "react";
import { VButton } from '../form';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const FIRST_PAGE_ROWS = 22, PER_PAGE = 23;

const BPdfExporter = (props) => {

  const { filename, columns, rows, title, variant, color, maxWidth } = props;

  const { t } = useTranslation('common');

  const [visible, setVisible] = useState(false);
  const [firstRows, setFirstRows] = useState([]);
  const [remainRows, setRemainRows] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (rows.length) {
      setFirstRows(rows.slice(0, FIRST_PAGE_ROWS)); // Set first 22 rows as first page

      let pointer = FIRST_PAGE_ROWS, page = 0, remains = [];
      while (pointer < rows.length) {
        remains.push({
          key: pointer,
          data: rows.slice(pointer, pointer + PER_PAGE)
        });
        pointer += PER_PAGE;
        page += 1;
      }

      setRemainRows(remains);
      setPage(page);
    }
  }, [rows, rows.length]);

  const generatePDF = () => {
    if (visible) return;
    setVisible(true);

    setTimeout(async () => {
      const pdf = new jsPDF({ orientation: "portrait", unit: 'px', format: 'a4', putOnlyUsedFonts: true });

      for (let i = 0; i <= page; i++) {
        const html = document.querySelector(`#pdf-page-${i}`);

        const data = await html2canvas(html);
        const img = data.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

        if (i < page) pdf.addPage('a4', 'portrait');
      }
      pdf.save(filename || 'report.pdf');
      setVisible(() => false);
    }, 200);
  };

  return <>

    <VButton variant={variant || "text"} color={color || "secondary"} className="text-sm ml-2 normal-case" onClick={generatePDF} loading={visible}>
      <Icon icon="eva:download-fill" />&nbsp;{t('Download')}
    </VButton>

    {
      visible && <div className='v-pdf-table' style={{ zIndex: -1000 }}>
        <div id="pdf-page-0" className={`${maxWidth || "max-w-5xl"} w-full flex justify-center fixed top-0 left-0 px-16 pb-16 pt-20 z-10`}>
          <div className="w-full">
            <div className="w-full flex flex-col items-center">
              <div className="text-3xl mt-6 mb-4">{title}</div>
              {
                firstRows.length && <BTable
                  className="w-full"
                  columns={columns}
                  data={firstRows}
                  total={firstRows.length}
                />
              }
            </div>
          </div>
        </div>
        {
          remainRows.map((item, idx) => <div key={item.key} id={`pdf-page-${idx + 1}`} className={`${maxWidth || "max-w-5xl"} w-full flex justify-center fixed top-0 left-0 px-16 pb-16 pt-20 z-10`}>
            <div className="w-full">
              <div className="w-full flex flex-col items-center">
                <BTable
                  className="w-full"
                  columns={columns}
                  data={item.data}
                />
              </div>
            </div>
          </div>)
        }
      </div>
    }
  </>;
};

export default BPdfExporter;;