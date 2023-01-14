import styled from "@emotion/styled";
import CustomDrawer from "@components/common/drawer/CustomDrawer";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, DatePicker, Input } from "antd";
import { ActionAddScheduleRequest } from "@store/slice/Calendar.slice.type";
import { RangePickerProps } from "antd/es/date-picker";
import { css } from "@emotion/react";
import { Flex } from "@components/common/global/components/Flex";

const { RangePicker } = DatePicker;

const Container = styled.div``;
const FormContainer = styled.form`
  padding: 2rem;
  box-sizing: border-box;
`;

const FormRow = styled.div<{
  isNotGrid?: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  margin: 1rem 0;

  ${(props) =>
    props.isNotGrid &&
    css`
      display: block;
    `};

  &:first-of-type {
    margin-top: 0;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333333;
`;

interface Props {
  title: string;
}

const CalendarScheduleAddDrawer = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { handleSubmit, setValue, control } = useForm<ActionAddScheduleRequest>();

  function onDrawerClose() {
    setOpen(false);
  }

  function onChangeScheduleRange(scheduleDays: RangePickerProps["value"]) {
    try {
      if (scheduleDays && Array.isArray(scheduleDays) && scheduleDays.every((day) => typeof day === "object")) {
        const startDate = scheduleDays[0]!.format("YYYY-MM-DD");
        const endDate = scheduleDays[1]!.format("YYYY-MM-DD");
        setValue("startDate", startDate);
        setValue("endDate", endDate);
      }
    } catch (e) {}
  }

  function onValid(data: ActionAddScheduleRequest) {
    console.log(data);
  }

  useEffect(() => {
    if (Boolean(title)) {
      setOpen(true);
    }
  }, [title]);

  return (
    <Container>
      <CustomDrawer
        width={800}
        drawerTitle={Boolean(title) ? title : "제목 없음"}
        open={open}
        setOpen={setOpen}
        onClose={onDrawerClose}
      >
        <FormContainer>
          <FormRow>
            <Label>일정 제목</Label>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} />}
            />
          </FormRow>

          <FormRow>
            <Label>일정 선택</Label>
            <RangePicker format="YYYY-MM-DD" onChange={onChangeScheduleRange} />
          </FormRow>

          <FormRow>
            <Label>일정 설명</Label>

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => <Input.TextArea onChange={onChange} value={value} />}
            />
          </FormRow>

          <FormRow isNotGrid>
            <Flex>
              <Button onClick={handleSubmit(onValid)}>저장</Button>
              <Button onClick={onDrawerClose}>취소</Button>
            </Flex>
          </FormRow>
        </FormContainer>
      </CustomDrawer>
    </Container>
  );
};

export default CalendarScheduleAddDrawer;
