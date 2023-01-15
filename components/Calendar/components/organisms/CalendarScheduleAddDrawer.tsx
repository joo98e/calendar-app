import styled from "@emotion/styled";
import CustomDrawer from "@components/common/drawer/CustomDrawer";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, DatePicker, Input } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { css } from "@emotion/react";
import { Flex, FlexColumn } from "@atoms/Flex";
import Typography from "@atoms/Typography";
import { useAppDispatch } from "@store/index";
import { CalendarActions } from "@store/slice/Calendar.slice";
import { DispatchActionAddSchedule } from "@store/slice/Calendar.slice.types";
import CustomColorPicker from "@components/common/colorPicker/CustomColorPicker";

const { TextArea } = Input;
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
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: #333333;
`;

interface Props {
  title: string;
}

const CalendarScheduleAddDrawer = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<DispatchActionAddSchedule>();

  function onDrawerClose() {
    setOpen(false);
    reset();
  }

  function onChangeScheduleRange(scheduleDays: RangePickerProps["value"]) {
    try {
      if (scheduleDays && Array.isArray(scheduleDays) && scheduleDays.every((day) => typeof day === "object")) {
        const startDate = scheduleDays[0]!.format("YYYY-MM-DD");
        const endDate = scheduleDays[1]!.format("YYYY-MM-DD");
        setValue("date.startDate", startDate);
        setValue("date.endDate", endDate);
        clearErrors("date");
      }
    } catch (e) {}
  }

  function onValid(data: DispatchActionAddSchedule) {
    dispatch(CalendarActions.addSchedule(data));
    console.log(data);
    onDrawerClose();
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
            <FlexColumn gap={1}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "일정 제목을 입력하세요.",
                }}
                render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} />}
              />
              {errors?.title?.message && <Typography variant={"error"}>{errors?.title?.message}</Typography>}
            </FlexColumn>
          </FormRow>

          <FormRow>
            <Label>일정 선택</Label>
            <FlexColumn gap={1}>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "일정을 입력하세요.",
                }}
                render={() => <RangePicker format="YYYY-MM-DD" onChange={onChangeScheduleRange} />}
              />
              {errors?.date?.message && <Typography variant={"error"}>{errors?.date?.message}</Typography>}
            </FlexColumn>
          </FormRow>

          <FormRow>
            <Label>일정 설명</Label>
            <FlexColumn gap={1}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "일정 설명을 입력하세요.",
                }}
                render={({ field: { onChange, value } }) => <TextArea onChange={onChange} value={value} />}
              />
              {errors?.description?.message && (
                <Typography variant={"error"}>{errors?.description?.message}</Typography>
              )}
            </FlexColumn>
          </FormRow>

          <FormRow>
            <Label>태그 색상</Label>
            <CustomColorPicker
              onChangeResult={(value) =>
                setValue(`tagColor`, `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a ?? 1})`)
              }
            />
          </FormRow>

          <FormRow isNotGrid>
            <Flex justifyContent={"center"} gap={2}>
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
